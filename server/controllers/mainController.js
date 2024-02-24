// For Homepage

exports.homepage = async (req, res)=>{

        const locals ={
            title: '|| Notes ||',
            description: 'Free Notes App'
        }
    res.render('index', {
     locals ,
     layout : '../Views/layouts/front-page'}    
    )
}

//For about 0page

exports.about = async (req, res)=>{

    const locals ={
        title: '|| About - Notes ||',
        description: 'Free Notes App'
    }
res.render('about', locals  )
}