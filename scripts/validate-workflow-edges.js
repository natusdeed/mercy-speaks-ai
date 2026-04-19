/**
 * Validates Mercy-AI-Agent-LIVE.json workflow edges:
 * - Every LLM edge must have non-empty label and condition (API truth; debugger "EMPTY STRING" is often a separate UI column).
 */
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../agent_configs/Mercy-AI-Agent-LIVE.json");

function main() {
  const raw = fs.readFileSync(file, "utf8");
  const agent = JSON.parse(raw);
  const edges = agent.workflow?.edges;
  if (!edges || typeof edges !== "object") {
    console.error("Missing workflow.edges");
    process.exit(1);
  }

  let errors = 0;
  for (const [id, edge] of Object.entries(edges)) {
    const fc = edge.forward_condition;
    if (!fc || fc.type !== "llm") continue;
    const label = fc.label;
    const condition = fc.condition;
    if (typeof label !== "string" || !label.trim()) {
      console.error(`Edge ${id}: LLM forward_condition missing label`);
      errors++;
    }
    if (typeof condition !== "string" || !condition.trim()) {
      console.error(`Edge ${id}: LLM forward_condition missing condition text`);
      errors++;
    }
  }

  if (errors) {
    console.error(`validate-workflow-edges: ${errors} issue(s)`);
    process.exit(1);
  }
  console.log("validate-workflow-edges: OK");
}

main();
