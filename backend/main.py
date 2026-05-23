from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
import os
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)

class CommunityPost(BaseModel):
    username: str
    content: str

class StudyRoom(BaseModel):
    room_name: str
    description: str

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="", 
        database="quiz_share_db"
    )

@app.get("/api/quizzes")
def get_quizzes():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM quizzes")
        quizzes = cursor.fetchall()
        cursor.close()
        conn.close()
        return quizzes
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

@app.post("/api/quizzes")
async def create_quiz(
    title: str = Form(...), 
    subject: str = Form(...),
    content: str = Form(None),
    materialType: str = Form(None),
    room_id: int = Form(None),
    file: UploadFile = File(None)
):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        file_path = None
        
        if file:
            file_path = f"uploads/{file.filename}"
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        
        sql = "INSERT INTO quizzes (title, subject, file_path, content, material_type, room_id) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (title, subject, file_path, content, materialType, room_id)
        
        cursor.execute(sql, val)
        conn.commit()
        new_id = cursor.lastrowid
        
        cursor.close()
        conn.close()
        
        return {
            "id": new_id, 
            "title": title, 
            "subject": subject, 
            "file_path": file_path,
            "message": "Saved successfully!"
        }
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

@app.get("/api/community/posts")
def get_community_posts():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM community_posts ORDER BY created_at DESC")
        posts = cursor.fetchall()
        cursor.close()
        conn.close()
        return posts
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

@app.post("/api/community/posts")
def create_community_post(post: CommunityPost):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        sql = "INSERT INTO community_posts (username, content) VALUES (%s, %s)"
        cursor.execute(sql, (post.username, post.content))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Post added successfully!"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

@app.get("/api/study_rooms")
def get_study_rooms():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM study_rooms ORDER BY created_at DESC")
        rooms = cursor.fetchall()
        cursor.close()
        conn.close()
        return rooms
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

@app.post("/api/study_rooms")
def create_study_room(room: StudyRoom):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        sql = "INSERT INTO study_rooms (room_name, description) VALUES (%s, %s)"
        cursor.execute(sql, (room.room_name, room.description))
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Study room created successfully!"}
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail=f"Database error: {err}")