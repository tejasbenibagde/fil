import tools from "./tools-data";

import ToolList from "./tool-list";
// Main Page Component
export default function ToolsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-4">All Tools</h1>
      <p className="text-lg text-gray-600 mb-8">
        Browse and use various file tools to simplify your work.
      </p>

      {/* Render ToolList with the tools array */}
      <ToolList tools={tools} />
    </div>
  );
}
