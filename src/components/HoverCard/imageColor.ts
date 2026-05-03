export async function getAdaptiveCardBackground(
    image: HTMLImageElement,
): Promise<string> {
    return new Promise((resolve) => {
        const applyGradient = () => {
            try {
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d", { willReadFrequently: true });

                if (!context) {
                    resolve(
                        "linear-gradient(135deg, rgb(17, 24, 39), rgb(15, 23, 42), rgb(0, 0, 0))",
                    );
                    return;
                }

                const sampleWidth = 32;
                const sampleHeight = 32;
                canvas.width = sampleWidth;
                canvas.height = sampleHeight;
                context.drawImage(image, 0, 0, sampleWidth, sampleHeight);

                const { data: pixelData } = context.getImageData(
                    0,
                    0,
                    sampleWidth,
                    sampleHeight,
                );

                let redTotal = 0;
                let greenTotal = 0;
                let blueTotal = 0;
                let count = 0;

                for (let index = 0; index < pixelData.length; index += 4) {
                    const alpha = pixelData[index + 3];
                    if (alpha < 125) continue;

                    redTotal += pixelData[index];
                    greenTotal += pixelData[index + 1];
                    blueTotal += pixelData[index + 2];
                    count += 1;
                }

                if (count === 0) {
                    resolve(
                        "linear-gradient(135deg, rgb(17, 24, 39), rgb(15, 23, 42), rgb(0, 0, 0))",
                    );
                    return;
                }

                const red = Math.round(redTotal / count);
                const green = Math.round(greenTotal / count);
                const blue = Math.round(blueTotal / count);

                const darkRed = Math.max(0, Math.round(red * 0.45));
                const darkGreen = Math.max(0, Math.round(green * 0.42));
                const darkBlue = Math.max(0, Math.round(blue * 0.4));

                const highlightRed = Math.min(255, Math.round(red * 1.08));
                const highlightGreen = Math.min(255, Math.round(green * 1.08));
                const highlightBlue = Math.min(255, Math.round(blue * 1.08));

                resolve(
                    `linear-gradient(135deg, rgb(${highlightRed}, ${highlightGreen}, ${highlightBlue}) 0%, rgb(${red}, ${green}, ${blue}) 48%, rgb(${darkRed}, ${darkGreen}, ${darkBlue}) 100%)`,
                );
            } catch {
                resolve(
                    "linear-gradient(135deg, rgb(17, 24, 39), rgb(15, 23, 42), rgb(0, 0, 0))",
                );
            }
        };

        if (image.complete) {
            applyGradient();
            return;
        }

        image.onload = applyGradient;
        image.onerror = () => {
            resolve(
                "linear-gradient(135deg, rgb(17, 24, 39), rgb(15, 23, 42), rgb(0, 0, 0))",
            );
        };
    });
}