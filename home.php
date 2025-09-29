<?php get_header(); ?>
<main>
    <h1>خانه</h1>
    <p>متن خوش‌آمدگویی یا معرفی کوتاه کسب‌وکار.</p>
    <?php
    if (have_posts()):
        while (have_posts()): the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <?php the_excerpt(); ?>
            </article>
        <?php endwhile;
        the_posts_pagination(array(
            'prev_text' => 'قبلی',
            'next_text' => 'بعدی',
        ));
    endif;
    ?>
</main>
<?php get_footer(); ?>