package com.reservas.backend.service.impl;


import com.reservas.backend.exception.ModelNotFoundException;
import com.reservas.backend.repository.IGenericRepo;
import com.reservas.backend.service.ICRUD;
import jakarta.transaction.Transactional;

import java.lang.reflect.Method;
import java.util.List;

public abstract class CRUDImpl<T, ID> implements ICRUD<T, ID> {

    protected abstract IGenericRepo<T, ID> getRepo();

    @Override
    @Transactional
    public T save(T t) {
        return getRepo().save(t);
    }

    @Override
    @Transactional
    public T update(ID id, T t) throws Exception{
        getRepo().findById(id).orElseThrow(() -> new ModelNotFoundException("ID NOT FOUND: " + id));
        //Java Reflection
        Class<?> clazz = t.getClass();
//        String className = clazz.getSimpleName();

        //setIdClassName
        String methodName = "setId";
        Method setIdMethod = clazz.getMethod(methodName, id.getClass());
        setIdMethod.invoke(t, id);

        return getRepo().save(t);
    }

    @Override
    public List<T> findAll() {
        return getRepo().findAll();
    }

    @Override
    public T findById(ID id) {
        return getRepo().findById(id).orElseThrow(() -> new ModelNotFoundException("ID NOT FOUND: " + id));
    }

    @Override
    public void delete(ID id) {
        getRepo().findById(id).orElseThrow(() -> new ModelNotFoundException("ID NOT FOUND: " + id));
        getRepo().deleteById(id);
    }
}
