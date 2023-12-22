$(document).ready(function(){
    $('#sorting').on('submit', function(e){
        e.preventDefault();
        let sortBy = $('#dropdown').val();
        if (sortBy === 'alpha') {
            sortByAlpha();
        } else if (sortBy === 'rating') {
            sortByRate();
        }
    });
    $('#movies').on('submit', function(e){
        e.preventDefault();
        let movieName=$('#movies input[name="movie-name"]').val();
        let movieRate=parseInt($('#movies input[name="rating"]').val(), 10);
        let deleteBtn=$('<button/>').text('Delete');
        if(!isNaN(movieRate)&&movieRate>=1&&movieRate<=10){
            let $li=$('<li>').append(
                $('<div>').text(movieName),
                $('<div>').html('&starf;'.repeat(movieRate)),
                $('<div>').append(deleteBtn)
            );
            $('#name').append($li);
            $('#movies input:not(.submit)').val('');
        }else{
            alert('Please enter a number between 1 and 10 for the rating');
            throw new Error('Please submit a number between 1 and 10');
        }
    });
});

$(document).ready(function(){
    $('ol').on('click','button',function(){
        $(this).closest('li').remove();
    })
})

function sortByAlpha(){
    let $nameList=$('#name');
    let $lis=$nameList.children('li');
    $lis.sort(function(a,b){
        let textA=$(a).find('div:first-child').text().toUpperCase();
        let textB=$(b).find('div:first-child').text().toUpperCase();
        return (textA<textB)?-1:(textA>textB)?1:0;
    });
    $nameList.html($lis);
}
function sortByRate(){
    let $nameList=$('#name');
    let $lis=$nameList.children('li');
    $lis.sort(function(a,b){
        let ratingA=convertToNumber($(a).find('div:nth-child(2)').html());
        let ratingB=convertToNumber($(b).find('div:nth-child(2)').html());
        return ratingB-ratingA;
    });
    $nameList.html($lis);
}


function convertToNumber(ratingHtml) {
    let numericRating=ratingHtml.replace(/&starf;/g,'').length;
    return numericRating;
}

// To make it so the movie name needs at least 2 characters, you would add if(movieName.length>=2),
//      but I know at least one movie that's only one character long so I didn't include it