---
title: "Building a Homelab Kubernetes Cluster"
date: "2024-04-09"
excerpt: "Documenting my homelab k8s setup - hardware choices, networking, and lessons learned from running production-style infrastructure at home."
tags: ["Kubernetes", "Homelab", "DevOps", "Infrastructure"]
---

# Building a Homelab Kubernetes Cluster

Documenting my homelab Kubernetes setup — hardware choices, networking, and lessons learned from running production-style infrastructure at home.

## Architecture

- **Control Plane**: 3x mini-PCs running Talos Linux.
- **Networking**: Cilium CNI with eBPF data path and BGP peering.
- **Storage**: Rook-Ceph distributed block and file storage.
- **GitOps**: ArgoCD managing declarative cluster state from Git.
