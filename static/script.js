document.addEventListener('DOMContentLoaded', function() { 
    // Получение ID пользователя из параметров URL 
    const params = new URLSearchParams(window.location.search); 
    const userId = params.get('user_id'); 
    const referrerId = params.get('referrer_id');  // Получаем ID реферера из URL, если он есть

    // Функция для загрузки баланса пользователя 
    function loadBalance() { 
        fetch('/api/balance/${userId}') 
            .then(response => response.json()) 
            .then(data => { 
                document.getElementById('balance').innerText = '${data.balance} $SHARK'; 
            }); 
    } 

    // Функция для загрузки таблицы лидеров 
    function loadLeaderboard() { 
        fetch('/api/leaderboard') 
            .then(response => response.json()) 
            .then(data => { 
                const leaderboard = document.getElementById('leaderboard'); 
                leaderboard.innerHTML = '';  // Очистка списка перед добавлением 
                data.leaders.forEach((leader, index) => { 
                    const listItem = document.createElement('li'); 
                    listItem.innerText = 'User ${leader.user_id}: ${leader.coins} $SHARK'; 
                    leaderboard.appendChild(listItem); 
                }); 
            }); 
    } 

    // Функция для обработки реферальной ссылки
    function processReferral() {
        if (referrerId) {
            fetch('/api/referral/${userId}?referrer_id=${referrerId}') 
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('You have received 15,000 $SHARK for using the referral link!');
                        loadBalance();  // Обновляем баланс после получения бонуса
                    } else {
                        console.error('Referral processing failed:', data.message);
                    }
                });
        }
    }

    // Загрузка данных 
    loadBalance(); 
    loadLeaderboard(); 
    processReferral();  // Обрабатываем реферальную ссылку, если она есть
});




