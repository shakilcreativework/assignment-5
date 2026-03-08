// console.log('JS file conneted...');
const api = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

let currentTab = "all";
const container = document.getElementById("issuesContainer");

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

// render all issues and show in UI
async function renderIssues() {
    container.innerHTML = '';

    // console.log(api);
    const res = await fetch(api)
    const data = await res.json()

    const issues = data?.data;
    // console.log(issues);

    let filtered;
    if(currentTab === "all"){
        filtered = issues;
        // issues
        document.getElementById('issueCount').innerText = `${filtered?.length} Issues`;
    }else{
        filtered = issues.filter(issue => issue?.status === currentTab);
        document.getElementById('issueCount').innerText = `${filtered?.length} Issues`;
    }

    filtered.forEach(issue => {
        console.log(issue);

        const {id, title, description, labels, priority, author, assignee, createdAt, updatedAt} = issue;
        const createdDate = new Date(createdAt).toLocaleDateString();
        // badge buttons
        const badges = labels.map(lebel => `
                <button class="flex gap-1 items-center justify-center py-1 px-2 rounded-full uppercase text-xs text-[#EF4444] font-medium bg-[#EF4444]/50"><img class="w-5" src="./assets/Open-Status.png" alt="">${lebel}</button>
            `).join('');

        // create new card div
        const card = document.createElement("div");
        card.className = "bg-white shadow-md rounded-lg border-t-4 border-[#00A96E]";

        card.innerHTML = `
            <div class="p-5 space-y-5">
                <div class="flex justify-between items-center">
                    
                    <img src="${issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="">
                    <button class="py-1 px-7 rounded-full text-[#EF4444] font-medium bg-[#EF4444]/50" >${priority}</button>
                </div>
                <h2 class="font-semibold text-sm text-[#1F2937] capitalize">${title}</h2>
                <p class="text-[#64748B] text-xs">${description}</p>
                <div id="badge" class="flex flex-wrap gap-2">
                    ${badges}
                </div>
            </div>

            <div class="p-5 border-t border-[#E4E4E7] space-y-2">
                <p class="text-[#64748B] text-xs">#1 by ${author}</p>
                <p class="text-[#64748B] text-xs">${createdDate}</p>
            </div>
        `;

        container.appendChild(card);
    });
        

};

// find all tap button by class name
document.querySelectorAll('.tab-btn').forEach(btn => {
    // console.log(btn);
    btn.addEventListener('click', function(){
        console.log('btn clicked!', btn);
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove("bg-[#4A00FF]", "text-white");
            b.classList.add('bg-gray-200');
        });

        this.classList.add("bg-[#4A00FF]", "text-white");
        this.classList.remove('bg-gray-200');

        currentTab = this.dataset.tab;
        renderIssues();
    });
});

renderIssues();