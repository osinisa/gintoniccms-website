<div class="jumbotron">
    <div class="container text-center">
        <h1>GintonicCMS</h1>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <p class="lead">
                    Built on top of CakePHP 3, GintonicCMS provides a robust and extensible core for your apps by wrapping the best apis and providing a flexible toolkit.
                </p>
                <?= $this->Html->link(
                    'Download GintonicCMS', 
                    ['controller' => 'Pages', 'getting_started'],
                    ['class' => 'btn btn-primary btn-lg']
                ); ?>
            </div>
        </div>
    </div>
</div>

<div class="container text-center">
    <h2>Get Rid of Constraints</h2>
    <p class="lead">
        Your organization is flexible, and so should be your code. Build flexible structures while keeping your code standardized and maintainable.
    </p>
    <div class="row">
        <div class="col-md-2 col-md-offset-5">
            <hr>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <h3>Putting the best tools to good use</h3>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <h3>Solving the most common problems</h3>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <h3>Providing a rich toolkit</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-2 col-md-offset-5">
            <hr>
        </div>
    </div>
    <p class="lead">
        GintonicCMS is open source. It's hosted, developped, and maintained on GitHub.
    </p>
    <?= $this->Html->link(
        'View Project on Github',
        ['https://github.com/gintonicweb/GintonicCMS'],
        ['class'=>'btn btn-default btn-lg']
    );?>
</div>