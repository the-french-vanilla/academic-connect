package com.thefrenchvanilla.academicconnect.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thefrenchvanilla.academicconnect.entity.TrendingNews;
import com.thefrenchvanilla.academicconnect.exception.EducationIdException;
import com.thefrenchvanilla.academicconnect.repository.TrendingNewsRepository;

@Service
public class TrendingNewsService {

    @Autowired
    private TrendingNewsRepository trendingNewsRepository;

    public TrendingNews createOrUpdateTrendingNews(TrendingNews trendingNews) {
        try {
            return trendingNewsRepository.save(trendingNews);
        } catch (Exception e) {
        	throw new EducationIdException("TrendingNews ID '" + trendingNews.getId() + "' already exists");
        }
    }
    
    public TrendingNews getTrendingNews(Long id) {
    	TrendingNews trendingNews;
    	try {
    		trendingNews = trendingNewsRepository.findById(id).get();
    		if (trendingNews == null) {
                throw new EducationIdException("TrendingNews ID '" + id + "' does not exist");
            }
    	} catch (NoSuchElementException e) {
    		throw new EducationIdException("TrendingNews ID '" + id + "' does not exist");
    	}
        return trendingNews;
    }

    public Iterable<TrendingNews> getAllTrendingNews() {
        return trendingNewsRepository.findAll();
    }

    public void deleteTrendingNews(Long id) {
    	TrendingNews trendingNews = trendingNewsRepository.findById(id).get();
        if (trendingNews == null) {
            throw new EducationIdException("Cannot delete TrendingNews with ID '" + id + "'. This trending news does not exist");
        }
        trendingNewsRepository.delete(trendingNews);
    }

}
