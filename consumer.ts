
import amqp from "amqplib"

async function main() {
    // Establish TCP connection
    const connection = await amqp.connect(
        "amqp://guest:guest@localhost:5672"
    );

    // Create logical AMQP channel
    const channel = await connection.createChannel();

    // Create queue if it doesn't exist
    await channel.assertQueue("orders", {
        durable: true,
    });

    const message = {
        name:"ahsish",
        email:"a@a.com"
    }

    channel.sendToQueue(
        "orders",
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
    );




    console.log("Waiting for messages...");

    channel.consume("orders", async (msg) => {

            if (msg !== null) {
                const data = msg.content.toString();

                console.log("Received:", data);

                // Tell RabbitMQ processing succeeded
                channel.ack(msg);
            }

    });
}

main().catch(console.error);