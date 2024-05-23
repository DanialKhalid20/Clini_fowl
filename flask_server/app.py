from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from PIL import Image, ImageDraw, ImageFont
import base64
import io

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])  # Ensure this matches your React app's URL

# Initialize YOLO model once
weights_path = 'best.pt'  # Ensure this is the correct path to your model weights
model = YOLO(weights_path)

# Function to make a prediction using the YOLO model
def make_prediction(model, image_path, confidence):
    results = model(image_path, conf=confidence)
    return results

# Function to draw detections on the image
def draw_detections(image_path, detections):
    image = Image.open(image_path)
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()
    
    for detection in detections:
        class_name = detection["class"]
        confidence = detection["confidence"]
        x1, y1, x2, y2 = detection["coordinates"]
        
        # Draw bounding box
        draw.rectangle([x1, y1, x2, y2], outline="red", width=3)
        
        # Draw label
        label = f"{class_name} ({confidence * 100:.2f}%)"
        text_bbox = draw.textbbox((x1, y1), label, font=font)
        draw.rectangle([text_bbox[0], text_bbox[1], text_bbox[2], text_bbox[3]], fill="red")
        draw.text((x1, y1), label, fill="white", font=font)
    
    return image

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    try:
        # Save the file to a temporary location
        image_path = "temp_image.jpg"
        file.save(image_path)
        
        # Make prediction
        results = make_prediction(model, image_path, confidence=0.2)
        
        # Extract detection results
        detections = []
        for result in results[0].boxes.data:
            x1, y1, x2, y2, conf, cls = result[:6]
            class_label = int(cls)
            class_name = "cocci" if class_label == 0 else "healthy" if class_label == 1 else "salmo"
            confidence = float(conf)
            detections.append({
                "class": class_name,
                "confidence": confidence,
                "coordinates": [float(x1), float(y1), float(x2), float(y2)]
            })
        
        # Draw detections on the image
        image_with_detections = draw_detections(image_path, detections)
        
        # Encode image to base64 for HTML display
        buffered = io.BytesIO()
        image_with_detections.save(buffered, format="JPEG")
        image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        return jsonify({"detections": detections, "image": image_base64})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '_main_':
    app.run(host='0.0.0.0', port=5000)