// Re-mounts on each navigation, giving routes a subtle fade with no screen wipes.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
