async function measurePing() {
  const start = performance.now();
  try {
    await fetch("https://1.1.1.1/cdn-cgi/trace", {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
    });
    const end = performance.now();
    return (end - start).toFixed(2);
  } catch {
    return "Error";
  }
}

async function measureDownload() {
  const url = "https://speed.cloudflare.com/__down?bytes=5000000"; // 5MB
  const size = 5 * 1024 * 1024;

  const start = performance.now();
  try {
    const res = await fetch(url, { cache: "no-store" });
    await res.blob();
    const end = performance.now();
    const duration = (end - start) / 1000;
    return ((size * 8) / duration / 1024 / 1024).toFixed(2);
  } catch {
    return "Error";
  }
}

async function measureUpload() {
  const url = "https://httpbin.org/post";
  const size = 2 * 1024 * 1024;
  const data = new Uint8Array(size);

  const start = performance.now();
  try {
    await fetch(url, {
      method: "POST",
      body: data,
      cache: "no-store",
    });
    const end = performance.now();
    const duration = (end - start) / 1000;
    return ((size * 8) / duration / 1024 / 1024).toFixed(2);
  } catch {
    return "Error";
  }
}

async function runTest() {
  document.getElementById("btn-text").textContent = "Testing...";

  document.getElementById("ping").textContent = "...";
  document.getElementById("download").textContent = "...";
  document.getElementById("upload").textContent = "...";

  const ping = await measurePing();
  document.getElementById("ping").textContent = ping;

  const download = await measureDownload();
  document.getElementById("download").textContent = download;

  const upload = await measureUpload();
  document.getElementById("upload").textContent = upload;

  document.getElementById("btn-text").textContent = "Start";
}
