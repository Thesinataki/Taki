<?php get_header(); ?>
<main>
    <h1>گالری</h1>
    <?php
    $args = array('post_type' => 'post', 'posts_per_page' => 20);
    $gallery_query = new WP_Query($args);
    if ($gallery_query->have_posts()):
        while ($gallery_query->have_posts()): $gallery_query->the_post(); ?>
            <div class="gallery-item">
                <a href="<?php the_permalink(); ?>">
                    <?php if(has_post_thumbnail()) the_post_thumbnail('medium'); ?>
                    <h2><?php the_title(); ?></h2>
                </a>
            </div>
        <?php endwhile;
        the_posts_pagination(array(
            'prev_text' => 'قبلی',
            'next_text' => 'بعدی',
        ));
        wp_reset_postdata();
    else:
        echo '<p>هیچ آیتمی یافت نشد.</p>';
    endif;
    ?>
</main>
<?php get_footer(); ?>