<?php
get_header();
?>
<main>
    <h1>خانه</h1>
    <?php
    if (have_posts()):
        while (have_posts()): the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <?php the_excerpt(); ?>
            </article>
        <?php endwhile;
        the_posts_pagination(array(
            'mid_size'  => 2,
            'prev_text' => 'قبلی',
            'next_text' => 'بعدی',
        ));
    else:
        echo '<p>هیچ پستی یافت نشد.</p>';
    endif;
    ?>
</main>
<?php get_footer(); ?>