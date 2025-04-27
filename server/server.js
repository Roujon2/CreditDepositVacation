import app from './app.js'
import { serverConfig } from './config/serverConfig.js'


const PORT = serverConfig.port;

// ---- Start Server ----
app.listen(PORT, () => {
    console.log(`Server is running on http://${serverConfig.host}:${PORT}`);
});