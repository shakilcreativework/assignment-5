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
        // console.log(issue);

        const {id, title, description, status, labels, priority, author, assignee, createdAt, updatedAt} = issue;
        const createdDate = new Date(createdAt).toLocaleDateString();

        // create new card div
        const card = document.createElement("div");
        card.className = `bg-white shadow-md rounded-lg border-t-4 ${status == 'open' ? 'border-[#00A96E]' : 'border-[#A855F7]'}`;

        card.innerHTML = `
            <div class="p-5 space-y-5">
                <div class="flex justify-between items-center">
                    <i class="text-xl ${issue?.status === 'open' ? 'fa-solid fa-circle-check text-[#00A96E]' : 'fa-regular fa-circle-check text-[#A855F7]'}"></i>
                    <button class="py-1 uppercase px-7 rounded-full font-medium ${priority == 'high' ? 'text-[#EF4444] bg-[#EF4444]/20' : priority == 'medium' ? 'text-[#F59E0B] bg-[#F59E0B]/20' : 'text-[#9CA3AF] bg-[#9CA3AF]/20'}" >${priority}</button>
                </div>
                <h2 class="font-semibold text-sm text-[#1F2937] capitalize cursor-pointer" onclick="info(${id})">${title}</h2>
                <p class="text-[#64748B] text-xs">${description}</p>
                <div class="flex flex-wrap gap-2">
                    ${labels.map(lebel => `
                        <button class="flex gap-1 items-center justify-center py-1 px-2 rounded-full uppercase text-xs font-medium ${lebel == 'bug' ? 'text-[#EF4444] bg-[#EF4444]/20 border border-[#EF4444]/40' : lebel == 'help wanted' ? 'text-[#F59E0B] bg-[#F59E0B]/20 border border-[#F59E0B]/40' : lebel == 'enhancement' ? 'text-[#00A96E] bg-[#00A96E]/20 border border-[#00A96E]/40' : lebel == 'documentation' ? 'text-violet-600 bg-violet-600/20 border border-violet-600/40' : lebel == 'good first issue' ? 'text-orange-600 bg-orange-600/20 border border-orange-600/40' :'text-[#9CA3AF] bg-[#9CA3AF]/20 border border-[#9CA3AF]/40'}"><i class="fa-solid fa-circle-exclamation text-sm"></i> ${lebel}</button>
                    `).join('')}
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

// get card information or details
async function info(id){
    const res = await fetch(api)
    const data = await res.json()
    
    const issues = data?.data;
    // console.log(issues);
    
    const findCardInfo = issues.find(issue => issue?.id === id);
    displayModal(findCardInfo);
};

// load modal card details
const displayModal = (cardInfo) => {
    // console.log(cardInfo);
    const {id, title, description, status, labels, priority, author, assignee, createdAt, updatedAt} = cardInfo;
    console.log(status);
    const createdDate = new Date(createdAt).toLocaleDateString();

    const detailsContainer = document.getElementById('detailsContainer');
    detailsContainer.innerHTML = `
        <h2 class="font-semibold text-sm text-[#1F2937] capitalize">${title}</h2>
        <div class="flex gap-3 items-center">
            <p class="text-xs py-1 px-3 rounded-full ${status === 'open' ? 'bg-[#00A96E]' : 'bg-[#A855F7]'} text-white">${status === 'open' ? 'Opened' : 'Closed'}</p>
            <span class="w-1 h-1 bg-[#64748B] rounded-full"></span>
            <p class="text-[#64748B] text-xs ">${status === 'open' ? 'Opened' : 'Closed'} by ${author}</p>
            <span class="w-1 h-1 bg-[#64748B] rounded-full"></span>
            <p class="text-[#64748B] text-xs ">${createdDate}</p>
        </div>
        <div class="flex flex-wrap gap-2">
            ${labels.map(lebel => `
                <button class="flex gap-1 items-center justify-center py-1 px-2 rounded-full uppercase text-xs font-medium ${lebel == 'bug' ? 'text-[#EF4444] bg-[#EF4444]/20 border border-[#EF4444]/40' : lebel == 'help wanted' ? 'text-[#F59E0B] bg-[#F59E0B]/20 border border-[#F59E0B]/40' : lebel == 'enhancement' ? 'text-[#00A96E] bg-[#00A96E]/20 border border-[#00A96E]/40' : lebel == 'documentation' ? 'text-violet-600 bg-violet-600/20 border border-violet-600/40' : lebel == 'good first issue' ? 'text-orange-600 bg-orange-600/20 border border-orange-600/40' :'text-[#9CA3AF] bg-[#9CA3AF]/20 border border-[#9CA3AF]/40'}"><i class="fa-solid fa-circle-exclamation text-sm"></i> ${lebel}</button>
            `).join('')}
        </div>
        <p class="text-[#64748B]">${description}</p>
        <div class="grid grid-cols-2 bg-[#F8FAFC] rounded-lg p-5">
            <div class="space-y-3">
                <p class="text-[#64748B] ">Assignee:</p>
                <p class="text-[#1F2937] capitalize font-semibold">${author?.replaceAll("_", " ")}</p>
            </div>
            <div class="space-y-3">
                <p class="text-[#64748B] ">Priority:</p>
                <button class="py-1 uppercase px-7 rounded-full font-medium ${priority == 'high' ? 'text-[#EF4444] bg-[#EF4444]/20' : priority == 'medium' ? 'text-[#F59E0B] bg-[#F59E0B]/20' : 'text-[#9CA3AF] bg-[#9CA3AF]/20'}" >${priority}</button>
            </div>
        </div>
    `;
    document.getElementById('card_info').showModal();
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