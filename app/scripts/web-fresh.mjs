// One-port clean start. Kills whatever is listening on PORT, then starts Expo web on that SAME port
// with a cleared Metro cache. Use this instead of opening new ports:  npm run web:fresh
// Cross-platform (Windows / macOS / Linux).
import { execSync, spawn } from "node:child_process";

const PORT = 8081;

function killPort(port) {
  try {
    if (process.platform === "win32") {
      const out = execSync("netstat -ano -p tcp", { encoding: "utf8" });
      const pids = new Set();
      for (const line of out.split(/\r?\n/)) {
        if (line.includes(`:${port} `) && /LISTENING/i.test(line)) {
          const pid = line.trim().split(/\s+/).pop();
          if (pid && pid !== "0") pids.add(pid);
        }
      }
      for (const pid of pids) {
        try { execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" }); console.log(`• freed port ${port} (killed PID ${pid})`); } catch {}
      }
    } else {
      try { execSync(`lsof -ti tcp:${port} | xargs -r kill -9`, { stdio: "ignore" }); console.log(`• freed port ${port}`); } catch {}
    }
  } catch {}
}

killPort(PORT);
console.log(`• clean-starting Expo web on http://localhost:${PORT} (cache cleared)…`);
const child = spawn("npx", ["expo", "start", "--web", "--port", String(PORT), "--clear"], {
  stdio: "inherit",
  shell: true,
});
child.on("exit", (code) => process.exit(code ?? 0));
