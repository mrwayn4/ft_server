import Fastify from "fastify";

import itemRoutes from "./routes/items.js"

const fastify = Fastify({logger:true});
const port = 5000;

fastify.register(itemRoutes);

const start = async () => {
    try{
        await fastify.listen({port})
    }catch (err){
        fastify.log.error(err);
        process.exit(1)
    }
}
start();