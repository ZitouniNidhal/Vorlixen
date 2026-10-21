---
title: "eBPF for Observability: A Practical Introduction"
date: "2024-07-21"
excerpt: "Getting started with eBPF-based observability tools - from understanding the basics to deploying in production."
tags: ["eBPF", "Observability", "Linux", "Telemetry"]
---

# eBPF for Observability: A Practical Introduction

This post covers eBPF-based observability tools from the basics to production deployment.

## What is eBPF?

Extended Berkeley Packet Filter (eBPF) is a revolutionary technology that allows developers to run sandboxed programs in the Linux kernel without changing kernel source code or loading kernel modules.

## Use Cases

- **Zero-overhead telemetry**: Intercept socket buffers and network system calls with sub-microsecond latency.
- **Dynamic tracing**: Attach kprobes, uprobes, and tracepoints across user and kernel space.
- **Security runtime enforcement**: Detect unauthorized file access or anomalous container breakout attempts.
