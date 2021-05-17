const initMemory = sizeInBytes => {
    const buffer = new ArrayBuffer(sizeInBytes);
    const data = new DataView(buffer);
    return data;
}

export default initMemory;