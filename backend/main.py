from typing import List, Optional
from collections import deque

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineNode(BaseModel):
    id: str

    class Config:
        extra = "allow"


class PipelineEdge(BaseModel):
    source: str
    target: str

    class Config:
        extra = "allow"


class PipelinePayload(BaseModel):
    nodes: List[PipelineNode] = []
    edges: List[PipelineEdge] = []


def analyze_pipeline(node_ids: List[str], edges: List[PipelineEdge]) -> dict:
    """
    Comprehensive pipeline analysis using Kahn's algorithm.
    Returns DAG status, topological ordering, and connectivity metrics.
    """
    adjacency = {nid: [] for nid in node_ids}
    in_degree = {nid: 0 for nid in node_ids}
    connected = set()

    for edge in edges:
        src, tgt = edge.source, edge.target
        # Handle edges referencing nodes not in the explicit node list
        for n in (src, tgt):
            if n not in adjacency:
                adjacency[n] = []
                in_degree[n] = 0
        adjacency[src].append(tgt)
        in_degree[tgt] += 1
        connected.add(src)
        connected.add(tgt)

    # Kahn's algorithm — topological sort + cycle detection
    queue = deque(nid for nid, deg in in_degree.items() if deg == 0)
    topo_order = []

    while queue:
        nid = queue.popleft()
        topo_order.append(nid)
        for neighbor in adjacency[nid]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = len(topo_order) == len(adjacency)
    isolated = [nid for nid in node_ids if nid not in connected]

    return {
        'is_dag': is_dag,
        'topological_order': topo_order if is_dag else None,
        'num_isolated': len(isolated),
    }


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    node_ids = [node.id for node in payload.nodes]

    analysis = analyze_pipeline(node_ids, payload.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        **analysis,
    }
