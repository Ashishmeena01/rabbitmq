
import amqp from "amqplib"

async function main() {
    const connection = await amqp.connect(
        "amqp://guest:guest@localhost:5672"
    );

    const channel = await connection.createChannel();

    await channel.assertQueue("orders", {
        durable: true,
    });

    const message = {
        orderId: 101,
        amount: 500,
    };

    channel.sendToQueue(
        "orders",
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
    );

    console.log("Message sent:", message);

    await channel.close();
    await connection.close();
}

main().catch(console.error);