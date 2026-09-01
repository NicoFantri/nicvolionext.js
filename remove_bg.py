from rembg import remove
from PIL import Image
import os

input_path_a = "public/images/fotoA.jpeg"
output_path_a = "public/images/fotoA.png"

input_path_b = "public/images/fotoB.jpeg"
output_path_b = "public/images/fotoB.png"

def remove_bg(input_path, output_path):
    print(f"Processing {input_path}...")
    if os.path.exists(input_path):
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        output_image.save(output_path)
        print(f"Saved to {output_path}")
    else:
        print(f"File not found: {input_path}")

remove_bg(input_path_a, output_path_a)
remove_bg(input_path_b, output_path_b)
print("Done!")
