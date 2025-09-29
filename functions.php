<?php
function gallery_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
}
add_action('after_setup_theme', 'gallery_theme_setup');

function gallery_theme_scripts() {
    wp_enqueue_style('gallery-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'gallery_theme_scripts');
