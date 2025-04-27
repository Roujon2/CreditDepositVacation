import app from './app';
import { serverConfig } from './config/serverConfig';

const PORT = serverConfig.port;

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`Server is running on http://${serverConfig.host}:${PORT}`);
});
