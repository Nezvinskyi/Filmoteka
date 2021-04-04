  initGallery:
	
	try {
    const { results, total_results } = await moviesApi.getPopularMovies();
    console.log('initial render. method:>>', moviesApi.fetchMethod);
    renderData(results);
  } catch (error) {
    // .then(hideLoader) !!
    onFetchError();
  }

  addEventListenerToGallery();

  moviesApi.getRefs().divContainer.addEventListener('click', searchGenreDate);

  console.log(total_results);

  //rendering pagination btns
  paginator.set('totalResult', total_results);
  setupPaginationBtns(
    paginator.getPaginationData().range,
    paginator.getPaginationData().last,
  );
  // .then(hideLoader)