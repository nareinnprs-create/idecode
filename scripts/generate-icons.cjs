const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

function crc32(buf) {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([t, data]);
  const c = Buffer.alloc(4);
  c.writeUInt32BE(crc32(crcData));
  return Buffer.concat([len, t, data, c]);
}

function createPNG(width, height, pixels) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    for (let x = 0; x < width * 4; x++) {
      raw[y * (width * 4 + 1) + 1 + x] = pixels[y * width * 4 + x];
    }
  }
  const compressed = zlib.deflateSync(raw);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([sig, pngChunk('IHDR', ihdr), pngChunk('IDAT', compressed), pngChunk('IEND', Buffer.alloc(0))]);
}

function lerp(a, b, t) { return a + (b - a) * t; }

function clamp(v) { return Math.max(0, Math.min(255, Math.round(v))); }

function generateGradientIcon(size) {
  const pixels = new Uint8Array(size * size * 4);
  const r1 = 0xf0, g1 = 0xa0, b1 = 0x30;
  const r2 = 0x60, g2 = 0xa5, b2 = 0xfa;
  const rInner = 0xff, gInner = 0xff, bInner = 0xff;

  const cx = size / 2, cy = size / 2;
  const radius = size * 0.38;
  const cornerRadius = size * 0.18;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Rounded rectangle test
      const rx = Math.abs(x - cx) - radius + cornerRadius;
      const ry = Math.abs(y - cy) - radius + cornerRadius;
      let outside = false;
      let rrDist = 0;

      if (rx > 0 && ry > 0) {
        rrDist = Math.sqrt(rx * rx + ry * ry);
        if (rrDist > cornerRadius) outside = true;
      } else if (rx > 0) {
        if (rx > radius) outside = true;
        rrDist = Math.max(0, rx - radius + cornerRadius > 0 ? rx : 0);
      } else if (ry > 0) {
        if (ry > radius) outside = true;
        rrDist = Math.max(0, ry - radius + cornerRadius > 0 ? ry : 0);
      } else {
        outside = false;
      }

      if (outside) {
        pixels[i] = 0; pixels[i + 1] = 0; pixels[i + 2] = 0; pixels[i + 3] = 0;
        continue;
      }

      // Gradient
      const t = (x + y) / (size * 2);
      const pr = lerp(r1, r2, t), pg = lerp(g1, g2, t), pb = lerp(b1, b2, t);

      // Anti-aliased edge
      let alpha = 255;
      if (rrDist > cornerRadius - 1.5) {
        alpha = clamp(255 * (1 - (rrDist - cornerRadius + 1.5) / 1.5));
        if (alpha <= 0) { pixels[i] = 0; pixels[i + 1] = 0; pixels[i + 2] = 0; pixels[i + 3] = 0; continue; }
      }

      // Draw "O" letter: white circle with transparent center hole
      const oOuterRadius = size * 0.32;
      const oInnerRadius = size * 0.18;
      const oDist = Math.sqrt(dx * dx + dy * dy);

      if (oDist < oOuterRadius) {
        if (oDist > oInnerRadius) {
          pixels[i] = rInner; pixels[i + 1] = gInner; pixels[i + 2] = bInner; pixels[i + 3] = clamp(alpha * (1 - (oInnerRadius + 2 - oDist) / 4));
        } else {
          pixels[i] = clamp(pr); pixels[i + 1] = clamp(pg); pixels[i + 2] = clamp(pb); pixels[i + 3] = clamp(alpha * (1 - (oInnerRadius - oDist) / 2));
        }
      } else {
        pixels[i] = clamp(pr); pixels[i + 1] = clamp(pg); pixels[i + 2] = clamp(pb); pixels[i + 3] = alpha;
      }
    }
  }
  return pixels;
}

const sizes = [32, 256];
const logoDir = path.join(__dirname, '..', 'logo');
const electronDir = path.join(__dirname, '..', 'examples', 'electron', 'resources');

for (const size of sizes) {
  const pixels = generateGradientIcon(size);
  const png = createPNG(size, size, pixels);
  const name = `app-icon-${size}.png`;
  const logoPath = path.join(logoDir, name);
  const electronPath = path.join(electronDir, name);
  fs.writeFileSync(logoPath, png);
  console.log(`Created ${logoPath} (${png.length} bytes)`);
  if (size === 256) {
    fs.writeFileSync(electronPath, png);
    console.log(`Created ${electronPath} (${png.length} bytes)`);
  }
}

// Also create favicon 32x32 PNG for backward compat
console.log('Done.');
