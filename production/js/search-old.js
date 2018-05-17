'use strict';

var app = angular.module('medicartApp', ['ngSanitize', 'ui.select']).config(['$interpolateProvider', function($interpolateProvider){
    $interpolateProvider.startSymbol('{(').endSymbol(')}');
  }]);

/**
 * Filter by breaking the search term into its words and find posts containing
 * all words regardless of their order.
 */
app.filter('wordsFilter', function() {

  /**
   * Search for posts containing terms in their titles, or bodies.
   *
   * @param results
   *   Array to push the results into.
   * @param posts
   *   A copy of the posts array.
   * @param field
   *   Either 'title' or 'content'.
   * @param terms
   *   The search terms.
   *
   * @return
   *   Array of matching posts.
   */
  var searchPosts = function(results, posts, field, terms) {
    // Search the terms in posts titles first, and in their contents afterwards.
    posts.forEach(function(post, index) {
      var match = true;

      terms.forEach(function(term) {
        // If the post doesn't contain the word in its title, remove it.
        if (post[field].indexOf(term) === -1) {
          match = false;
        }
      });

      if (match) {
        results.push(post);
        posts.splice(index, 1);
      }
    });
  };

  return function(posts, search) {
    var results = [];

    if (!posts.length) {
      return results;
    }

    // Work on a copy of the posts array, tp be able to remove posts without
    // affecting the next search.
    posts = posts.slice();

    search = search.replace(/[!@%.,"'׳״)(\?]/g, "");

    var terms = search.toLowerCase().split(" ");

    searchPosts(results, posts, 'title', terms);
    searchPosts(results, posts, 'content', terms);


    return results;
  };
});

app.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.clear = function() {
    $scope.post.selected = undefined;
    $scope.title.selected = undefined;
    $scope.url.selected = undefined;
  };

  $scope.post = {};
  $scope.content = [];
  $http.get('/content.json.html').success(function(data) {
    $scope.content = data;
  });

}]);
