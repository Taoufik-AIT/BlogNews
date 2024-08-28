<template>
    <div class="comments-section">
      <h3>Commentaires</h3>
      <div class="comment-form">
        <textarea v-model="newComment.text" placeholder="Ajoutez un commentaire..." rows="3"></textarea>
        <div v-if="newComment.attachment" class="attachment-preview">
          <img :src="newComment.attachment" alt="Pièce jointe" />
          <button @click="removeAttachment" class="remove-attachment">×</button>
        </div>
        <div class="form-controls">
          <button @click="toggleEmojiPicker" class="emoji-button">😊</button>
          <input type="file" @change="handleFileUpload" ref="fileInput" accept="image/*" style="display: none;">
          <button @click="triggerFileUpload" class="attach-button">📎</button>
          <button @click="submitComment" class="submit-button">Publier</button>
        </div>
        <div v-if="showEmojiPicker" class="emoji-picker">
          <button v-for="emoji in emojis" :key="emoji" @click="addEmoji(emoji)">{{ emoji }}</button>
        </div>
      </div>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <span class="comment-date">{{ formatDate(comment.date) }}</span>
          <div class="comment-actions">
            <button @click="editComment(comment)" class="edit-button">✏️</button>
            <button @click="deleteComment(comment.id)" class="delete-button">🗑️</button>
          </div>
        </div>
        <div v-if="!comment.editing" class="comment-content">
          <p>{{ comment.text }}</p>
          <img v-if="comment.attachment" :src="comment.attachment" alt="Pièce jointe" class="attachment">
        </div>
        <div v-else class="edit-form">
          <textarea v-model="comment.editText" rows="3"></textarea>
          <img v-if="comment.attachment" :src="comment.attachment" alt="Pièce jointe" class="attachment">
          <div class="edit-controls">
            <input type="file" @change="(e) => handleEditFileUpload(e, comment)" accept="image/*" style="display: none;" :ref="`editFileInput_${comment.id}`">
            <button @click="triggerEditFileUpload(comment.id)" class="attach-button">📎</button>
            <button @click="saveEdit(comment)" class="save-button">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Comments',
    props: {
      articleId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        comments: [],
        newComment: { text: '', attachment: null },
        showEmojiPicker: false,
        emojis: ['😊', '😂', '🤔', '👍', '❤️', '🎉', '🔥', '🌟', '💡', '🤯']
      }
    },
    methods: {
      loadComments() {
        const savedComments = localStorage.getItem(`comments_${this.articleId}`);
        if (savedComments) {
          this.comments = JSON.parse(savedComments);
        }
      },
      saveComments() {
        localStorage.setItem(`comments_${this.articleId}`, JSON.stringify(this.comments));
      },
      submitComment() {
        if (this.newComment.text.trim() || this.newComment.attachment) {
          this.comments.push({
            id: Date.now(),
            text: this.newComment.text,
            attachment: this.newComment.attachment,
            date: new Date(),
            editing: false
          });
          this.newComment = { text: '', attachment: null };
          this.saveComments();
        }
      },
      deleteComment(id) {
        this.comments = this.comments.filter(comment => comment.id !== id);
        this.saveComments();
      },
      editComment(comment) {
        comment.editing = true;
        comment.editText = comment.text;
      },
      saveEdit(comment) {
        comment.text = comment.editText;
        comment.editing = false;
        this.saveComments();
      },
      formatDate(date) {
        return new Date(date).toLocaleString();
      },
      addEmoji(emoji) {
        this.newComment.text += emoji;
      },
      toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
      },
      triggerFileUpload() {
        this.$refs.fileInput.click();
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.newComment.attachment = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      removeAttachment() {
        this.newComment.attachment = null;
      },
      triggerEditFileUpload(commentId) {
        this.$refs[`editFileInput_${commentId}`][0].click();
      },
      handleEditFileUpload(event, comment) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            comment.attachment = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    },
    mounted() {
      this.loadComments();
    },
    watch: {
      comments: {
        handler() {
          this.saveComments();
        },
        deep: true
      }
    }
  }
  </script>
  
  <style scoped>
  .comments-section {
    margin-top: 2rem;
    border-top: 1px solid #e0e0e0;
    padding-top: 1rem;
  }
  
  .comment-form {
    margin-bottom: 1rem;
    background-color: #f8f8f8;
    padding: 1rem;
  }
  
  .comment-form textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    resize: none;
  }
  
  .attachment-preview {
    position: relative;
    display: inline-block;
    margin-top: 0.5rem;
  }
  
  .attachment-preview img {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
  }
  
  .remove-attachment {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #ff4444;
    color: white;
    border: none;
    width: 20px;
    height: 20px;
    font-size: 14px;
    cursor: pointer;
  }
  
  .form-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .emoji-button, .attach-button, .submit-button {
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }
  
  .submit-button {
    color: white;
    background-color: #151515;
  }
  
  .emoji-picker {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .emoji-picker button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .comment {
    background-color: #f8f8f8;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .comment-date {
    font-size: 0.8rem;
    color: #666;
  }
  
  .comment-actions button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 0.5rem;
  }
  
  .comment-content {
    text-align: left;
  }
  
  .edit-form textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    resize: none;
  }
  
  .edit-controls {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  
  .save-button {
    background-color: #151515;
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  
  .attachment {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
    margin-top: 0.5rem;
  }
  </style>