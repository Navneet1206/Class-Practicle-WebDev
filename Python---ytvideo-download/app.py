from flask import Flask, render_template, request, send_from_directory, jsonify
from pytube import YouTube
import yt_dlp
import os
import time

app = Flask(__name__)

# Create a directory for storing downloaded videos
DOWNLOAD_FOLDER = 'downloads'
if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download():
    video_url = request.form['video_url']
    
    # Using yt-dlp for downloading
    try:
        # Set custom User-Agent
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }

        ydl_opts = {
            'format': 'best',
            'outtmpl': os.path.join(DOWNLOAD_FOLDER, '%(title)s.%(ext)s'),
            'headers': headers
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])
        
        # Wait for the download to finish and then serve the file
        file_name = os.listdir(DOWNLOAD_FOLDER)[0]  # Assuming only one file is downloaded
        return send_from_directory(DOWNLOAD_FOLDER, file_name, as_attachment=True)

    except Exception as e:
        return jsonify({'error': f"An error occurred: {str(e)}"}), 500

@app.route('/clear_downloads')
def clear_downloads():
    """Clear the download folder to avoid clutter"""
    for file_name in os.listdir(DOWNLOAD_FOLDER):
        file_path = os.path.join(DOWNLOAD_FOLDER, file_name)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error removing file {file_name}: {e}")
    return "Download folder cleared!"

if __name__ == '__main__':
    app.run(debug=True)
