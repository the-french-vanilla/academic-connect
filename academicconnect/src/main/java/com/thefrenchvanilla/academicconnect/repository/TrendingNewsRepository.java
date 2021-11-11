package com.thefrenchvanilla.academicconnect.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.thefrenchvanilla.academicconnect.entity.TrendingNews;

@Repository
public interface TrendingNewsRepository extends CrudRepository<TrendingNews, Long> {

    @Override
    Iterable<TrendingNews> findAll();
}
