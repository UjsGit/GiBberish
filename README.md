# GiBberish 
<img width="400" alt="image" src="https://github.com/user-attachments/assets/288088c0-f02a-4220-b835-899ec636dcc2" />

GiBberish is a sleek, dynamic web tool built to solve a universal tech frustration: the "missing" storage space on your digital devices. 

Ever buy a 1TB hard drive or a 128GB flash drive, plug it in, and realize you are mysteriously missing a huge chunk of space? This tool calculates exactly how much usable space you *actually* get, breaking down the discrepancy between marketing claims, computer math, and operating system overhead.

[Live Site](https://ujsgit.github.io/GiBberish/)

## ❓ Why This Exists (The "Math Tax")

There is a fundamental disconnect in how humans and computers count bytes:
* **Storage Manufacturers** count in **Base-10 (Decimal)**. To them, 1 Gigabyte (GB) is exactly 1,000,000,000 bytes. 
* **Operating Systems** (like Windows and Android) count in **Base-2 (Binary)**. To them, 1 Gibibyte (GiB) is exactly 1,073,741,824 bytes.

As storage drives get larger, this mathematical gap widens exponentially. That gap is what we call the "Math Tax"—it’s not actually missing physical space, it is just a difference in translation between the marketing department and your computer's motherboard!

## 🧮 The Core Formula

To calculate the actual binary capacity (GiB) from the advertised commercial capacity (GB), GiBberish utilizes this direct mathematical conversion:

$$x \text{ GiB} = \frac{y \text{ GB} \times 10^9}{2^{30}}$$

## ⚙️ The Converters: Standard vs. Custom Profiles

Real-world storage loss isn't just about math. That is why GiBberish features a dual-layer calculation engine:

### 1. The Standard Converter (Pure Hardware)
This profile runs the pure, unadulterated mathematical conversion using the formula above. It tells you the exact binary capacity of the drive with zero software loaded onto it. This is perfect for calculating raw space on external SD cards, USB flash drives, or secondary bare-metal SSDs.

### 2. The Custom Converters (Device Profiles)
Hardware doesn't exist in a vacuum. Operating systems take up space for boot sectors, recovery partitions, system caches, and pre-installed software (bloatware). GiBberish includes custom heuristic profiles to estimate your *true* usable space based on the device you are using:
* **PC / Mac:** Accounts for heavy OS footprints (Windows/macOS) and system formatting overhead.
* **Smartphone:** Factors in iOS/Android system partitions and un-deletable carrier bloatware.
* **Gaming Console:** Calculates the aggressive proprietary formatting and reserved OS space required by modern consoles (like the PS5 or Xbox Series X).

## 🕹️ How to Use

1. **Select Your Hardware:** Choose your device profile (Pure Hardware vs. Custom Device) from the left-hand control panel.
2. **Input Advertised Size:** Enter the size printed on the box of your drive (e.g., 128, 512, 1000) and select your unit (GB or TB).
3. **View the Breakdown:** The tool instantly generates a visual capacity bar showing your real usable space versus the lost "Math Tax" and OS overhead.

## ✨ Key Features

* **Visual Capacity Breakdown:** A clear, color-coded progress bar separating the space you keep from the invisible math/system gaps.
* **"What Fits?" Estimator:** A quick-reference guide showing approximately how many photos, videos, or games will fit into your true available space.
* **Storage Lore:** Built-in micro-insights explaining real-world industry controversies, like the famous 60GB smartphone bloatware panic.
