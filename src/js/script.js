document.addEventListener('DOMContentLoaded', function() {
    // زر عرض التفاصيل ينقل مباشرة للكارت
    const detailsButtons = document.querySelectorAll('.view-details-btn[data-car]');
    detailsButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const car = btn.getAttribute('data-car');
            window.location.href = `Cart.html?car=${car}`;
        });
    });

    // نموذج التواصل
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;
            let errorMessage = '';
            if (name === '') {
                isValid = false; errorMessage += 'الرجاء إدخال اسمك.\n';
            }
            if (email === '') {
                isValid = false; errorMessage += 'الرجاء إدخال بريدك الإلكتروني.\n';
            } else if (!validateEmail(email)) {
                isValid = false; errorMessage += 'الرجاء إدخال بريد إلكتروني صحيح.\n';
            }
            if (message === '') {
                isValid = false; errorMessage += 'الرجاء إدخال رسالتك.\n';
            }
            if (!isValid) {
                alert('خطأ في النموذج:\n' + errorMessage);
            } else {
                alert('تم إرسال رسالتك بنجاح! شكراً لك.');
                // *ملاحظة*: تم إزالة submit() هنا لمنع إعادة توجيه الصفحة بعد تنبيه alert()، 
                // ويمكنك تعديل هذا حسب طريقة إرسال بيانات النموذج المفضلة لديك.
            }
        });
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //  Cart الصور في  
    const mainImage = document.getElementById('main-car-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            const imageName = thumbnail.getAttribute('data-image-name'); 
            thumbnail.addEventListener('click', function() {
                // تم تعديل المسار هنا: إزالة `../`
                mainImage.src = `src/imgs/${imageName}`;
                updateActiveThumbnail(this);
            });
        });
        if(thumbnails[0]) {
             thumbnails[0].classList.add('active-thumb');
        }
    }
    function updateActiveThumbnail(activeThumbnail) {
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active-thumb');
        });
        activeThumbnail.classList.add('active-thumb');
    }
    
    // تأثير الهيدر
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    //بينات السيارات واضافتها في الكارت
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    const carData = {
        'porsche911': {
            name: 'Porsche 911 Turbo S 2024',
            price: '850,000 ريال',
            color: 'أبيض لؤلؤي', 
            engine: '3.7 لتر، 6 سلندر مزدوج التيربو',
            mileage: '0 كم',
            image: 'porsche-911-turbo-s.jpeg',
            description: 'سيارة رياضية فارهة تجمع بين الأداء العالي والفخامة المطلقة، مناسبة لعشاق الإندفاع والقوة.'
        },
        'vanquish': {
            name: 'Aston Martin Vanquish 2025',
            price: '920,000 ريال',
            color: 'فضي معدني',
            engine: '5.2 لتر، V12 مزدوج التيربو',
            mileage: '1,500 كم',
            image: 'aston-martin-vanquish.jpg',
            description: 'سيارة ذات تصميم بريطاني أصيل، قوة المحرك V12 مع تكنولوجيا متقدمة وحديثة.'
        },
        'model1': {
            name: 'BMW M5 2024',
            price: '350,000 ريال',
            color: 'أزرق ميتاليك',
            engine: '4.4 لتر، V8 مزدوج التيربو',
            mileage: '6,000 كم',
            image: 'car-model-1.webp',
            description: 'سيارة سيدان رياضية تجمع بين العملية والأداء الرياضي القوي والمتانة الألمانية.'
        },
        'model2': {
            name: 'Mercedes S500 2023',
            price: '480,000 ريال',
            color: 'أسود',
            engine: '3.0 لتر، 6 سلندر مع نظام هجين خفيف',
            mileage: '15,000 كم',
            image: 'car-model-2.avif',
            description: 'الفخامة الألمانية المتطورة مع الراحة والتكنولوجيا الأحدث في عالم السيارات العالمية.'
        },
        'denali': {
            name: 'GMC Denali 2024 (NEW)',
            price: '320,000 ريال',
            color: 'أسود',
            engine: '6.2 لتر، V8',
            mileage: '0 كم',
            image: 'gmc-denali-2025.jpg',
            description: 'سيارة دفع رباعي فاخرة وقوية مع المساحة والحماية المناسبة للطرق الطويلة والرملية.'
        },
        'escalade': {
            name: 'Cadillac Escalade 2024',
            price: '450,000 ريال',
            color: 'أسود',
            engine: '6.2 لتر، V8',
            mileage: '5,000 كم',
            image: 'cadillac-escalade-2025.jpeg',
            description: 'الأسطورة الأمريكية في الفخامة العائلية والرحلات الطويلة مع قوة دفع لا تضاهى.'
        },
        'default': {
            name: 'سيارة غير محددة',
            price: 'السعر غير متوفر',
            color: '---',
            engine: '---',
            mileage: '---',
            description: 'لم يتم اختيار سيارة محددة بعد.'
        }
    };
    const carId = getUrlParameter('car') || 'default';
    const selectedCar = carData[carId] || carData['default'];
    const carDetailsSection = document.querySelector('.car-details-section');
    if (carDetailsSection) {
        const carSpecs = document.querySelector('.car-specs');
        if (carSpecs) {
            carSpecs.querySelector('h3').textContent = selectedCar.name;
            carSpecs.querySelector('.car-details-description').textContent = selectedCar.description;
            const table = carSpecs.querySelector('.specs-table');
            if (table) {
                table.querySelector('tr:nth-child(1) td').textContent = selectedCar.price;
                table.querySelector('tr:nth-child(2) td').textContent = selectedCar.color;
                table.querySelector('tr:nth-child(3) td').textContent = selectedCar.engine;
                table.querySelector('tr:nth-child(4) td').textContent = selectedCar.mileage;
            }
        }
        const mainCarImage = document.getElementById('main-car-image');
        if (mainCarImage) {
            // تم تعديل المسار هنا: إزالة `../`
            mainCarImage.src = `src/imgs/${selectedCar.image}`;
        }
        // زر تأكيد الطلب
        const confirmBtn = document.querySelector('.confirm-purchase-btn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert("تم طلب السيارة بنجاح! سنتواصل معك قريبًا.");
            });
        }
    }
});