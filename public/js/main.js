$(document).ready(() => {
    $('.delete-mov').on('click', (e) => {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/movies/'+id,
            success: (response) => {
                console.log('deleted movie');
                window.location.href='/movies';
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
});