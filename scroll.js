$(document).on("scroll", function () {
  let pixels = $(document).scrollTop();

  if (pixels > 100) {
    $(".title").addClass("hidden");
  } else {
    $(".title").removeClass("hidden");
  }
});
