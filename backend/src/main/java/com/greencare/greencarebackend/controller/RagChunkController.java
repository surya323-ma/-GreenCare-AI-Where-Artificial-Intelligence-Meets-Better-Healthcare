package com.greencare.greencarebackend.controller;

import com.greencare.greencarebackend.model.RagChunk;
import com.greencare.greencarebackend.repository.RagChunkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rag")
@CrossOrigin(origins = "*")
public class RagChunkController {

    @Autowired
    private RagChunkRepository repository;

    @GetMapping
    public List<RagChunk> getAllChunks() {
        return repository.findAll();
    }

    @GetMapping("/search")
    public List<RagChunk> searchChunks(@RequestParam(defaultValue = "") String query) {
        if (query.trim().isEmpty()) {
            return repository.findAll();
        }
        return repository.findByCategoryContainingIgnoreCaseOrChunkTextContainingIgnoreCase(query, query);
    }
}
