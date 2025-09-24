import path from "path";
import fs from "fs";
import { Express } from "express";

export function auto_import_router(app: Express) {
  const baseDir = path.join(__dirname, "domain");
  fs.readdirSync(baseDir).forEach((domain) => {
    const routersDir = path.join(baseDir, domain, "routers");
    if (!fs.existsSync(routersDir)) return;
    fs.readdirSync(routersDir).forEach((version) => {
      const versionDir = path.join(routersDir, version);
      fs.readdirSync(versionDir).forEach((file) => {
        if (file.endsWith(".router.ts") || file.endsWith(".router.js")) {
          const routePath = path.join(versionDir, file);
          const router = require(routePath).default;
          const mountPath = `/${domain}/${version}/`;
          app.use(mountPath, router);
          console.log(`✅ Mounted: ${mountPath}`);
        }
      });
    });
  });
}
