package com.greencare.greencarebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rag_chunks")
public class RagChunk {

    @Id
    private String id;

    @Column(name = "doc_ref", nullable = false)
    private String docRef;

    private String category;

    @Column(name = "chunk_text", nullable = false, columnDefinition = "TEXT")
    private String chunkText;

    @Column(name = "similarity_score")
    private Double similarityScore;

    @Column(name = "sdg_alignment")
    private String sdgAlignment;

    public RagChunk() {}

    public RagChunk(String id, String docRef, String category, String chunkText, Double similarityScore, String sdgAlignment) {
        this.id = id;
        this.docRef = docRef;
        this.category = category;
        this.chunkText = chunkText;
        this.similarityScore = similarityScore;
        this.sdgAlignment = sdgAlignment;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDocRef() { return docRef; }
    public void setDocRef(String docRef) { this.docRef = docRef; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getChunkText() { return chunkText; }
    public void setChunkText(String chunkText) { this.chunkText = chunkText; }

    public Double getSimilarityScore() { return similarityScore; }
    public void setSimilarityScore(Double similarityScore) { this.similarityScore = similarityScore; }

    public String getSdgAlignment() { return sdgAlignment; }
    public void setSdgAlignment(String sdgAlignment) { this.sdgAlignment = sdgAlignment; }
}
