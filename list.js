function getSelectedDietType() {
    const types = ['halal', 'kosher', 'omnivore', 'pescatarian', 'vegan', 'vegetarian'];
    for (const type of types) {
        const checkbox = document.getElementById(type);
        if (checkbox && checkbox.checked) return type;
    }
    return null;
}

function getSelectedAllergies() {
    const allergies = [];
    const checkboxes = document.querySelectorAll('#moreOptions input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb.checked) {
            const label = cb.parentElement.innerText.trim();
            allergies.push(label);
        }
    });
    return allergies;
}

function getMaxCost() {
    const slider = document.getElementById("myRange");
    return slider ? parseInt(slider.value) : null;
}

function getServingSize() {
    const input = document.getElementById("servingInput");
    return input ? parseInt(input.value) : null;
}

function getDuration() {
    const input = document.getElementById("durationInput");
    return input ? parseInt(input.value) : null;
}

const generateBtn = document.getElementById('generateBtn');

generateBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const dietType = getSelectedDietType();
    const allergies = getSelectedAllergies();

    const yesCheckbox = document.getElementById('yesCheckbox');
    const noCheckbox = document.getElementById('noCheckbox');

    // Reset previous highlights
    document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));

    let hasError = false;

    if (!dietType) {
        ['halal', 'kosher', 'omnivore', 'pescatarian', 'vegan', 'vegetarian'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.parentElement.classList.add('invalid');
        });
        hasError = true;
    }

    if (!yesCheckbox.checked && !noCheckbox.checked) {
        yesCheckbox.parentElement.classList.add('invalid');
        noCheckbox.parentElement.classList.add('invalid');
        hasError = true;
    }

    if (hasError) {
        alert('Please complete all selections.');
        return;
    }

    const now = new Date();
    let rawName = document.getElementById('listName').innerText.trim();
    if (!rawName) {
        const mmddyy = now.toLocaleDateString(undefined, {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        });
        rawName = `New List (${mmddyy})`;
    }

    const newListData = {
        listName: rawName,
        dietType,
        allergies,
        maxCost: getMaxCost(),
        servingSize: getServingSize(),
        duration: getDuration(),
        createdAt: now
    };

    try {
        generateBtn.disabled = true;
        generateBtn.innerText = 'Saving...';

        const token = localStorage.getItem('token');
        const apiUrl = 'http://localhost:3000/api/lists/generate';
        console.log('Making request to:', apiUrl);
        console.log('Token:', token ? 'Present' : 'Missing');
        console.log('Request data:', newListData);
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(newListData)
        });


        if (!response.ok) {
            const errorText = await response.text();
            console.log('Response status:', response.status);
            console.log('Response error:', errorText);
            throw new Error(`Failed to save list: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        console.log('List saved:', data);

        /* change window to generated list */
        window.location.href = "./generated-list.html?id=" + data._id;
        
    } catch (err) {
        console.error('Error saving list:', err);
        alert('Error saving your list. Please try again.');
    } finally {
        generateBtn.disabled = false;
        generateBtn.innerText = 'Generate List';
    }
});