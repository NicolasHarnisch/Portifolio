import { Component, ErrorInfo, ReactNode } from "react";

// An optional external graphic must never take the portfolio down.
export default class GraphicsBoundary extends Component<{
  children: ReactNode;
  fallback?: ReactNode;
  onError?: () => void;
}, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.();
    if (import.meta.env.DEV) console.warn("Optional graphic unavailable", error, info.componentStack);
  }
  render() { return this.state.failed ? this.props.fallback ?? null : this.props.children; }
}
