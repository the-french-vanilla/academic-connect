package com.thefrenchvanilla.academicconnect.controller;

import com.thefrenchvanilla.academicconnect.entity.TrendingNews;
import com.thefrenchvanilla.academicconnect.service.MapValidationErrorService;
import com.thefrenchvanilla.academicconnect.service.TrendingNewsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/trendingnews")
@CrossOrigin(origins = "http://localhost:3000")
public class TrendingNewsController {

    @Autowired
    private TrendingNewsService trendingNewsService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createTrendingNews(@Valid @RequestBody TrendingNews trendingNews, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) {
        	return errorMap;
        }

        TrendingNews trendingNews1 = trendingNewsService.createOrUpdateTrendingNews(trendingNews);
        return new ResponseEntity<TrendingNews>(trendingNews1, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getTrendingNews(@PathVariable Long id) {
    	TrendingNews trendingNews = trendingNewsService.getTrendingNews(id);
        return new ResponseEntity<TrendingNews>(trendingNews, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<TrendingNews> getAllTrendingNews() {
    	return trendingNewsService.getAllTrendingNews();
    }
    
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateTrendingNews(@Valid @RequestBody TrendingNews trendingNews, BindingResult result, Principal principal) {
//        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//        if (errorMap != null) {
//        	return errorMap;
//        }
//
//        TrendingNews trendingNews1 = trendingNewsService.createOrUpdateTrendingNews(trendingNews);
//        return new ResponseEntity<TrendingNews>(trendingNews1, HttpStatus.OK);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrendingNews(@PathVariable Long id) {
    	trendingNewsService.deleteTrendingNews(id);
        return new ResponseEntity<String>("TrendingNews with ID: '" + id + "' was deleted", HttpStatus.OK);
    }
}
