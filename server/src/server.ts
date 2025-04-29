import app from './app';
import { serverConfig } from './config/serverConfig';
import { initORM } from './db/mikro-orm';

const PORT = serverConfig.port;

// ---- Initialize ORM ----
await initORM();

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`Server is running on http://${serverConfig.host}:${PORT}`);
});
