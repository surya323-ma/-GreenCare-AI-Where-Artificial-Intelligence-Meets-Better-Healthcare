package com.greencare.greencarebackend.repository;

import com.greencare.greencarebackend.model.RagChunk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RagChunkRepository extends JpaRepository<RagChunk, String> {
    List<RagChunk> findByCategoryContainingIgnoreCaseOrChunkTextContainingIgnoreCase(String category, String query);
}
