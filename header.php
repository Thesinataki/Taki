<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php bloginfo('name'); ?> | <?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header>
    <nav>
        <ul>
            <li><a href="<?php echo home_url(); ?>">خانه</a></li>
            <li><a href="<?php echo home_url('/about'); ?>">درباره ما</a></li>
            <li><a href="<?php echo home_url('/gallery'); ?>">گالری</a></li>
            <li><a href="<?php echo home_url('/blog'); ?>">وبلاگ</a></li>
            <li><a href="<?php echo home_url('/contact'); ?>">تماس با ما</a></li>
            <li><a href="<?php echo home_url('/privacy'); ?>">حریم خصوصی</a></li>
            <li><a href="<?php echo home_url('/terms'); ?>">قوانین و مقررات</a></li>
        </ul>
    </nav>
</header>