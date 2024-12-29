export default function ProposalLayout({ children }) {
  return (
        <div className="proposal-layout bg-white">
          {/* Custom header or layout content */}
          <main>{children}</main>
          {/* Custom footer or additional layout elements */}
        </div>
  );
}