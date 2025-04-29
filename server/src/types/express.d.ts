import { EntityManager } from "@mikro-orm/postgresql";

declare global {
    namespace Express {
        interface Request {
            em: EntityManager; // Add the EntityManager to the request object
        }
    }
}