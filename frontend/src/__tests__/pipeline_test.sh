#!/bin/bash
# Comprehensive Pipeline Test Suite
# Tests every node type and realistic pipeline combinations

API="http://localhost:8000/pipelines/parse"
PASS=0
FAIL=0

test_pipeline() {
  local name="$1"
  local payload="$2"
  local expected_nodes="$3"
  local expected_edges="$4"
  local expected_dag="$5"

  result=$(curl -s -X POST "$API" -H "Content-Type: application/json" -d "$payload")
  
  actual_nodes=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin)['num_nodes'])")
  actual_edges=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin)['num_edges'])")
  actual_dag=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin)['is_dag'])")

  if [[ "$actual_nodes" == "$expected_nodes" && "$actual_edges" == "$expected_edges" && "$actual_dag" == "$expected_dag" ]]; then
    echo "✅ PASS: $name"
    echo "   Nodes=$actual_nodes Edges=$actual_edges DAG=$actual_dag"
    PASS=$((PASS + 1))
  else
    echo "❌ FAIL: $name"
    echo "   Expected: Nodes=$expected_nodes Edges=$expected_edges DAG=$expected_dag"
    echo "   Got:      Nodes=$actual_nodes Edges=$actual_edges DAG=$actual_dag"
    FAIL=$((FAIL + 1))
  fi
}

echo "==========================================="
echo "  VectorShift Pipeline Test Suite"
echo "==========================================="
echo ""

echo "--- 1. SINGLE NODE TESTS ---"

test_pipeline "Input node only" \
  '{"nodes":[{"id":"customInput-1"}],"edges":[]}' \
  1 0 True

test_pipeline "Output node only" \
  '{"nodes":[{"id":"customOutput-1"}],"edges":[]}' \
  1 0 True

test_pipeline "Text node only" \
  '{"nodes":[{"id":"text-1"}],"edges":[]}' \
  1 0 True

test_pipeline "LLM node only" \
  '{"nodes":[{"id":"llm-1"}],"edges":[]}' \
  1 0 True

test_pipeline "API node only" \
  '{"nodes":[{"id":"api-1"}],"edges":[]}' \
  1 0 True

test_pipeline "Database node only" \
  '{"nodes":[{"id":"database-1"}],"edges":[]}' \
  1 0 True

test_pipeline "Delay node only" \
  '{"nodes":[{"id":"delay-1"}],"edges":[]}' \
  1 0 True

test_pipeline "Filter node only" \
  '{"nodes":[{"id":"filter-1"}],"edges":[]}' \
  1 0 True

test_pipeline "Email node only" \
  '{"nodes":[{"id":"email-1"}],"edges":[]}' \
  1 0 True

echo ""
echo "--- 2. BASIC TWO-NODE PIPELINES ---"

test_pipeline "Input → Output" \
  '{"nodes":[{"id":"customInput-1"},{"id":"customOutput-1"}],"edges":[{"source":"customInput-1","target":"customOutput-1"}]}' \
  2 1 True

test_pipeline "API → Output" \
  '{"nodes":[{"id":"api-1"},{"id":"customOutput-1"}],"edges":[{"source":"api-1","target":"customOutput-1"}]}' \
  2 1 True

test_pipeline "Database → Output" \
  '{"nodes":[{"id":"database-1"},{"id":"customOutput-1"}],"edges":[{"source":"database-1","target":"customOutput-1"}]}' \
  2 1 True

test_pipeline "Text → Output" \
  '{"nodes":[{"id":"text-1"},{"id":"customOutput-1"}],"edges":[{"source":"text-1","target":"customOutput-1"}]}' \
  2 1 True

test_pipeline "Input → LLM" \
  '{"nodes":[{"id":"customInput-1"},{"id":"llm-1"}],"edges":[{"source":"customInput-1","target":"llm-1"}]}' \
  2 1 True

test_pipeline "Input → Email" \
  '{"nodes":[{"id":"customInput-1"},{"id":"email-1"}],"edges":[{"source":"customInput-1","target":"email-1"}]}' \
  2 1 True

echo ""
echo "--- 3. THREE-NODE LINEAR PIPELINES ---"

test_pipeline "Input → LLM → Output" \
  '{"nodes":[{"id":"customInput-1"},{"id":"llm-1"},{"id":"customOutput-1"}],"edges":[{"source":"customInput-1","target":"llm-1"},{"source":"llm-1","target":"customOutput-1"}]}' \
  3 2 True

test_pipeline "Input → Filter → Output" \
  '{"nodes":[{"id":"customInput-1"},{"id":"filter-1"},{"id":"customOutput-1"}],"edges":[{"source":"customInput-1","target":"filter-1"},{"source":"filter-1","target":"customOutput-1"}]}' \
  3 2 True

test_pipeline "Input → Delay → Output" \
  '{"nodes":[{"id":"customInput-1"},{"id":"delay-1"},{"id":"customOutput-1"}],"edges":[{"source":"customInput-1","target":"delay-1"},{"source":"delay-1","target":"customOutput-1"}]}' \
  3 2 True

test_pipeline "API → LLM → Output" \
  '{"nodes":[{"id":"api-1"},{"id":"llm-1"},{"id":"customOutput-1"}],"edges":[{"source":"api-1","target":"llm-1"},{"source":"llm-1","target":"customOutput-1"}]}' \
  3 2 True

test_pipeline "Database → Filter → Email" \
  '{"nodes":[{"id":"database-1"},{"id":"filter-1"},{"id":"email-1"}],"edges":[{"source":"database-1","target":"filter-1"},{"source":"filter-1","target":"email-1"}]}' \
  3 2 True

echo ""
echo "--- 4. COMPLEX MULTI-NODE DAG PIPELINES ---"

test_pipeline "Input + Text → LLM → Filter → Output (5 nodes, 4 edges)" \
  '{"nodes":[{"id":"customInput-1"},{"id":"text-1"},{"id":"llm-1"},{"id":"filter-1"},{"id":"customOutput-1"}],"edges":[{"source":"customInput-1","target":"llm-1"},{"source":"text-1","target":"llm-1"},{"source":"llm-1","target":"filter-1"},{"source":"filter-1","target":"customOutput-1"}]}' \
  5 4 True

test_pipeline "Input → API → Delay → Email → Output (5 nodes, 4 edges)" \
  '{"nodes":[{"id":"customInput-1"},{"id":"api-1"},{"id":"delay-1"},{"id":"email-1"},{"id":"customOutput-1"}],"edges":[{"source":"customInput-1","target":"api-1"},{"source":"api-1","target":"delay-1"},{"source":"delay-1","target":"email-1"},{"source":"email-1","target":"customOutput-1"}]}' \
  5 4 True

test_pipeline "Fan-out: Input → LLM + Filter + Email (4 nodes, 3 edges)" \
  '{"nodes":[{"id":"customInput-1"},{"id":"llm-1"},{"id":"filter-1"},{"id":"email-1"}],"edges":[{"source":"customInput-1","target":"llm-1"},{"source":"customInput-1","target":"filter-1"},{"source":"customInput-1","target":"email-1"}]}' \
  4 3 True

test_pipeline "Fan-in: Input + API + Database → LLM (4 nodes, 3 edges)" \
  '{"nodes":[{"id":"customInput-1"},{"id":"api-1"},{"id":"database-1"},{"id":"llm-1"}],"edges":[{"source":"customInput-1","target":"llm-1"},{"source":"api-1","target":"llm-1"},{"source":"database-1","target":"llm-1"}]}' \
  4 3 True

test_pipeline "ALL 9 node types in a DAG (9 nodes, 8 edges)" \
  '{"nodes":[{"id":"customInput-1"},{"id":"customOutput-1"},{"id":"text-1"},{"id":"llm-1"},{"id":"api-1"},{"id":"database-1"},{"id":"delay-1"},{"id":"filter-1"},{"id":"email-1"}],"edges":[{"source":"customInput-1","target":"llm-1"},{"source":"text-1","target":"llm-1"},{"source":"api-1","target":"filter-1"},{"source":"database-1","target":"filter-1"},{"source":"llm-1","target":"delay-1"},{"source":"filter-1","target":"delay-1"},{"source":"delay-1","target":"email-1"},{"source":"email-1","target":"customOutput-1"}]}' \
  9 8 True

echo ""
echo "--- 5. CYCLE DETECTION (should be is_dag=False) ---"

test_pipeline "Simple 2-node cycle: A ↔ B" \
  '{"nodes":[{"id":"llm-1"},{"id":"filter-1"}],"edges":[{"source":"llm-1","target":"filter-1"},{"source":"filter-1","target":"llm-1"}]}' \
  2 2 False

test_pipeline "3-node cycle: A → B → C → A" \
  '{"nodes":[{"id":"api-1"},{"id":"llm-1"},{"id":"email-1"}],"edges":[{"source":"api-1","target":"llm-1"},{"source":"llm-1","target":"email-1"},{"source":"email-1","target":"api-1"}]}' \
  3 3 False

test_pipeline "Self-loop: node → itself" \
  '{"nodes":[{"id":"llm-1"}],"edges":[{"source":"llm-1","target":"llm-1"}]}' \
  1 1 False

test_pipeline "Partial cycle in larger graph (5 nodes, cycle in 3)" \
  '{"nodes":[{"id":"customInput-1"},{"id":"llm-1"},{"id":"filter-1"},{"id":"delay-1"},{"id":"customOutput-1"}],"edges":[{"source":"customInput-1","target":"llm-1"},{"source":"llm-1","target":"filter-1"},{"source":"filter-1","target":"delay-1"},{"source":"delay-1","target":"llm-1"},{"source":"delay-1","target":"customOutput-1"}]}' \
  5 5 False

echo ""
echo "--- 6. EDGE CASES ---"

test_pipeline "Empty pipeline (0 nodes, 0 edges)" \
  '{"nodes":[],"edges":[]}' \
  0 0 True

test_pipeline "Disconnected nodes (3 nodes, 0 edges)" \
  '{"nodes":[{"id":"customInput-1"},{"id":"llm-1"},{"id":"customOutput-1"}],"edges":[]}' \
  3 0 True

test_pipeline "Diamond DAG: A→B, A→C, B→D, C→D" \
  '{"nodes":[{"id":"customInput-1"},{"id":"llm-1"},{"id":"filter-1"},{"id":"customOutput-1"}],"edges":[{"source":"customInput-1","target":"llm-1"},{"source":"customInput-1","target":"filter-1"},{"source":"llm-1","target":"customOutput-1"},{"source":"filter-1","target":"customOutput-1"}]}' \
  4 4 True

echo ""
echo "==========================================="
echo "  RESULTS: $PASS passed, $FAIL failed"
echo "==========================================="

if [[ $FAIL -eq 0 ]]; then
  echo "  🎉 ALL TESTS PASSED!"
else
  echo "  ⚠️  Some tests failed."
fi
